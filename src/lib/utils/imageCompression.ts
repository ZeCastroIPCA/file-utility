import imageCompression from 'browser-image-compression'

export async function compressImage(file: File, compressionPercentage: number): Promise<Blob> {
  const originalSizeMB = file.size / (1024 * 1024) // Convert file size from bytes to MB
  const targetSizeMB = (compressionPercentage / 100) * originalSizeMB // Calculate target size based on the percentage
  
  let compressedFile = file
  let compressedSizeMB = originalSizeMB
  
  const options = {
    maxSizeMB: targetSizeMB,
    useWebWorker: true,
  }
  
  let iterationCount = 0
  const maxIterations = 10 // Set a maximum number of iterations to prevent infinite loop
  
  // Iteratively compress the image until the desired size is achieved
  while (compressedSizeMB > targetSizeMB && iterationCount < maxIterations) {
    const previousSizeMB = compressedSizeMB
    compressedFile = await imageCompression(compressedFile, options)
    compressedSizeMB = compressedFile.size / (1024 * 1024)
    console.log(`Compressed size: ${compressedSizeMB.toFixed(2)} MB`)
    
    // Break the loop if the size reduction is negligible
    if (previousSizeMB - compressedSizeMB < 0.01) {
      console.log('Size reduction is negligible, stopping compression.')
      break
    }
    
    iterationCount++
  }

  return compressedFile
}