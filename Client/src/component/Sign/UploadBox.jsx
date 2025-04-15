import React, { useEffect, useState } from 'react';
import './uploadstyle.css'
import axios from 'axios';

const UploadBox = ({setImgurl}) => {
    const [file, setFile] = useState(null);
    const [imgsrc, setImgsrc] = useState("http://100dayscss.com/codepen/upload.svg");
    const [uploading, setUploading] = useState(false);
    const [cloudUrl, setCloudUrl] = useState(null);


    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) setFile(selected);
    };

    useEffect(() => {
        if (file) {
            const newSrc = URL.createObjectURL(file);
            setImgsrc(newSrc);
            uploadToCloudinary(file);
            // cleanup to avoid memory leaks
            return () => URL.revokeObjectURL(newSrc);
        }
    }, [file]);

    const uploadToCloudinary = async (file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Web_Chat_UserImag'); // Replace this

        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dcbykcqbe/image/upload', formData);
            setCloudUrl(res.data.secure_url);
            setImgurl(res.data.secure_url)
            console.log("Uploaded to Cloudinary:", res.data.secure_url);
        } catch (err) {
            console.error("Cloudinary Upload Error", err);
        } finally {
            setUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setImgsrc('http://100dayscss.com/codepen/upload.svg');
        setCloudUrl(null);
        setImgurl(null);
    }

    return (
        <div className="max-w-sm mx-auto mb-1">

            <div className="dropzone " >
                <img src={imgsrc} className="upload-icon mt-2 rounded" />
                <input type="file" className="upload-input" accept="image/*" onChange={handleFileChange} />
            </div>
            {file && (
                <div className="file-info d-flex justify-content-between mt-1">
                    <p className='m-0'>{file.name} ({(file.size / (1024 * 1024)).toFixed(1)}MB)</p>
                    <p onClick={removeFile} className="remove-btn px-1 m-0">Remove</p>
                </div>
            )}

            {uploading && <p className="text-center text-warning mt-1 mb-0">Uploading...</p>}
            {cloudUrl && <p className="text-center text-success mt-1 mb-0">Uploaded! ✅</p>}

        </div>
    );
};

export default UploadBox;
