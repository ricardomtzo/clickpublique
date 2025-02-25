import { useEffect, useState } from "react";
import { Button, Grid, Card, CardMedia, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MultiImageUploader = ({onChange}: {onChange: any}) => {
  const [images, setImages] = useState<any>([]);
  const [imagesFiles, setImagesFiles] = useState<any>([]);

  useEffect(() => {
    onChange(imagesFiles);
  }, [images]);

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file: any) => URL.createObjectURL(file));

    setImagesFiles((prevFiles: any) => [...prevFiles, ...files]);
    setImages((prevImages: any) => [...prevImages, ...imageUrls]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages: any) => prevImages.filter((prevImage: any, i: number) => i !== index));
  };

  return (
    <div>
      <input
        accept="image/*"
        id="upload-input"
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <label htmlFor="upload-input">
        <Button variant="contained" component="span" color="success">
          Adicionar Imagens
        </Button>
      </label>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {images.map((src: any, index: number) => (
          <Grid item xs={4} sm={3} md={2} key={index}>
            <Card className="p-2">
              <CardMedia component="img" height="140" image={src} alt={`Imagem ${index + 1}`} />
              <IconButton onClick={() => handleRemoveImage(index)} size="small" style={{ right: 5, top: 5 }}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MultiImageUploader;
