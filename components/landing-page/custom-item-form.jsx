import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';


export default function CustomItemForm({url, setUrl}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setUrl(value);
  };

  return (
    <div>
      <AddPhotoAlternateOutlinedIcon style={{ margin: "auto",height: "60px", width:"60px",color: "#28384f" }} className="max-w-min hover:cursor-pointer hover:bg-pata-500" onClick={handleClickOpen}/>

      {/*<Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>*/}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Item image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Import an image for this item from URL:
            {/* https://images.snowleader.com/cdn-cgi/image/f=auto,fit=scale-down,q=85/https://images.snowleader.com/media/catalog/product/cache/1/image/0dc2d03fe217f8c83829496872af24a0/s/w/swing_500_neo_-configurable-valandre-vala00051_1.jpg */}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image URL"
            type="url"
            fullWidth
            variant="standard"
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
