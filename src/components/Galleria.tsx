
import React, { useEffect, useState } from 'react';
import { Galleria, GalleriaResponsiveOptions } from 'primereact/galleria';
import { environment } from '@/environments/environment';

export default function Gallerie({ imageList }: any) {
    const [images, setImages] = useState(imageList)
    const responsiveOptions: GalleriaResponsiveOptions[] = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    useEffect(() => {
        setImages(imageList)
        console.log(imageList)
    }, [imageList])

    const itemTemplate = (item: any) => {
        const img = `${environment.storageUrl}/${item?.path}` || '';
        return <img src={img} alt={item.alt} style={{ width: '100%', height: '300px', display: 'block', objectFit: 'cover' }} />;
    }

    const thumbnailTemplate = (item: any) => {
        const img = `${environment.storageUrl}/${item?.path}` || '';
        return <img src={img} alt={item.name} style={{ display: 'block', height: 60 }} />;
    }

    return (
        <div className="card"> 
            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} circular style={{ maxWidth: '500px' }}
                showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div>
    )
}
        