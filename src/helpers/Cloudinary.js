import { v2 as cloudinary } from 'cloudinary';




    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
        api_secret: '_mwfsAz8yn7bYWwQTKbtx0N73YI' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
    export const UploadImage =async(file,folder)=>{
        const buffer = await file.arrayBuffer()
        const bytes = Buffer.from(buffer)
       return new Promise(async(resolve,reject)=>{
        await cloudinary.uploader.upload_stream({
                resource_type:"auto",
                folder:folder,
            },async(err,result)=>{
                if(err){
                 return   reject(err.message);
                }
               return resolve(result)
            }).end(bytes)
        })
   
    }