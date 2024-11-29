'use client'

import { useState, useRef, useEffect } from 'react'
import { Camera } from 'lucide-react'
import * as faceapi from 'face-api.js'

type VirtualTryOnProps = {
  productImage?: string
}

export default function VirtualTryOn({ productImage }: VirtualTryOnProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
      setIsModelLoaded(true)
    }
    loadModels()
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsCameraOpen(true)
    } catch (err) {
      console.error("Error accessing the camera:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
    setIsCameraOpen(false)
  }

  useEffect(() => {
    if (isCameraOpen && isModelLoaded && videoRef.current && canvasRef.current && productImage) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      const drawFrame = async () => {
        if (ctx) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

          const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()

          if (detections) {
            const resizedDetections = faceapi.resizeResults(detections, { width: canvas.width, height: canvas.height })
            
            // Draw face landmarks
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

            // Draw product image on top of the face
            const img = new Image()
            img.src = productImage
            img.onload = () => {
              const faceBox = resizedDetections.detection.box
              ctx.drawImage(img, faceBox.x, faceBox.y, faceBox.width, faceBox.height)
            }
          }
        }
        requestAnimationFrame(drawFrame)
      }

      video.onloadedmetadata = () => {
        drawFrame()
      }
    }
  }, [isCameraOpen, isModelLoaded, productImage])

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Virtual Try-On</h2>
      {!isCameraOpen ? (
        <button
          onClick={startCamera}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Camera size={20} />
          <span>Start Virtual Try-On</span>
        </button>
      ) : (
        <div className="relative">
          <video ref={videoRef} autoPlay playsInline className="hidden" />
          <canvas ref={canvasRef} className="w-full max-w-md mx-auto rounded-lg" />
          <button
            onClick={stopCamera}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Stop Camera
          </button>
        </div>
      )}
    </div>
  )
}

