import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileUp, X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UploadResponse } from '../types';

interface UploaderProps {
  onUploadSuccess: (fileId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onUploadSuccess, isLoading, setIsLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.e2k', '.EDB'],
      'application/json': ['.json'],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  const removeFile = () => {
    setSelectedFile(null);
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post<UploadResponse>('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.fileId) {
        toast.success('File uploaded successfully!');
        onUploadSuccess(response.data.fileId);
      } else {
        toast.error(response.data.message || 'Upload failed');
      }
    } catch (error) {
      toast.error('Error uploading file. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card fade-in">
      <h2 className="text-xl font-semibold mb-4">Upload ETABS Model</h2>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary-400 bg-primary-50' : 'border-neutral-300 hover:border-primary-300'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        <Upload className="mx-auto h-12 w-12 text-neutral-400 mb-3" />
        
        {isDragActive ? (
          <p className="text-primary-600">Drop the file here...</p>
        ) : (
          <>
            <p className="text-neutral-600 mb-2">Drag & drop your ETABS model file here</p>
            <p className="text-neutral-500 text-sm">Supports .e2k, .EDB, or JSON export files</p>
          </>
        )}
        
        <button 
          type="button"
          disabled={isLoading}
          className="btn btn-secondary mt-4 mx-auto flex items-center"
        >
          <FileUp className="w-4 h-4 mr-2" />
          Browse Files
        </button>
      </div>

      {selectedFile && (
        <div className="mt-4 p-3 bg-neutral-100 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-neutral-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {!isLoading && (
                <button 
                  onClick={removeFile}
                  className="text-neutral-500 hover:text-error-500 p-1 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={uploadFile}
          disabled={!selectedFile || isLoading}
          className={`btn btn-primary flex items-center ${
            !selectedFile || isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload & Analyze
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Uploader;