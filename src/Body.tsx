import './Body.css'
import {Button, Input} from 'antd'
import image01 from './logo/memeimg.png'
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { useState } from 'react';

export default function Body() {
    const handleClickDownload = async () => {
        const now = new Date();
        const timeToString = now.toLocaleString();

        const imgWithText = document.querySelector<HTMLElement>('.Image-div');
        if (!imgWithText) return;
        // console.log(imgWithText);

        const canvas = await html2canvas(imgWithText);
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, `meme_img_${timeToString}.png`, 'image/png');
    };

    const handleClickChangeImage = async() => {

    };

    const [prompt1, setPrompt1] = useState('');
    const [prompt2, setPrompt2] = useState('');
    // const [img, setImg] = useState();

    return (
        <div className='Body'>
            <div>
                <div className='Input-div'>
                    <Input placeholder="Shut up" className='Input-textbox' value={prompt1} onChange={(e)=>setPrompt1(e.target.value)}/>
                    <Input placeholder="and take my money" className='Input-textbox' value={prompt2} onChange={(e)=>setPrompt2(e.target.value)}/>
                </div>
                
                <div className='Button-div'>
                    <Button type="primary" className='Change-image-button' onClick={handleClickChangeImage}>Get a new meme image  🖼</Button>
                </div>

                <div className='Image-div'>
                    <img src={image01} alt='img01' className='Image' />

                    <div className='Text-image-top'>{prompt1.toUpperCase()}</div>
                    <div className='Text-image-buttom'>{prompt2.toUpperCase()}</div>
                </div>
                <div className='Button-div'>
                    <Button type="primary" className='Download-button' onClick={handleClickDownload}>Download meme</Button>
                </div>
            </div>
        </div>
    );
}