import React from 'react'



export default function NFT() {
    const images = require.context('./Assests/NFTs/', true);
    const imagelist = images.keys().map(image => images(image));

    console.log(imagelist)

    return (
        <>
            {/* {imagelist.map((image, index) => (
                <img key={index} src={image} width={200}/>
            ))} */}
            {/* {console.log(images)} */}
        </>
    )
}