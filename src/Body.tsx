import './Body.css'
import {Button, Input} from 'antd'
import image01 from './images/memeimg_01.png'
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
// import htmlToImage from "html-to-image";

export default function Body() {
    const [prompt1, setPrompt1] = useState('');
    const [prompt2, setPrompt2] = useState('');
    const [memes, setMemes] = useState([]);
    const [memeImg, setMemeImg] = useState(image01);

    useEffect(()=> {
        const api= "https://api.imgflip.com/get_memes";
        fetch(api)
            .then(response => response.json())
            .then(memes => setMemes(memes.data.memes));

        // console.log(memes, '1');
    }, []);

    useEffect(()=> {
        console.log(memes);
    }, [memes])

    const handleClickDownload = async () => {
        const now = new Date();
        const timeToString = now.toLocaleString();
        const imgWithText = document.querySelector<HTMLElement>('.Image-div');
        if (!imgWithText) return;
        // console.log(imgWithText);

        const canvas = await html2canvas(imgWithText);
        const dataURL = canvas.toDataURL('image/jpg');

        console.log(dataURL)
        downloadjs(dataURL, `meme_img_${timeToString}.jpg`, 'image/jpg');

    };

    const handleClickChangeImage = () => {
        const memeIndex = (Math.floor(Math.random() * memes.length)) % memes.length;
        console.log(memeIndex);

        setMemeImg(memes[memeIndex]['url']);
    }

    useEffect(
        () => {
            console.log(memeImg)
        }, [memeImg]
    )

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
                    {/* <img src={image01} alt='img01' className='Image' /> */}
                    
                    <img src={memeImg} alt='img01' className='Image' />

                    <div className='Text-image-top'>{prompt1.toUpperCase()}</div>
                    <div className='Text-image-buttom'>{prompt2.toUpperCase()}</div>
                </div>

                <div className='Button-div' style={{
                    margin:'10px'
                }}>
                    <Button type="primary" icon={<DownloadOutlined />} className='Download-button' onClick={handleClickDownload}>Download meme</Button>
                </div>
            </div>
        </div>
    );
}