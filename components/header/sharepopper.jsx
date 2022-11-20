import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';


export default function SharePopper(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button className="hover:cursor-pointer hover:bg-pata-500" aria-describedby={id} type="button" onClick={handleClick}>
        <ShareOutlinedIcon style={{ color: "#28384f" }}  />
        <span className="text-center text-pata-400 text-xl"> Share </span>
      </button> 
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', color: '#28384f' }}>
          <Link
            as={`/b/${props.shareUrl}`}
            href={`/b/[backpack]`}
          > 
            <a > {process.env.NEXT_PUBLIC_URL}b/{props.shareUrl} </a>         
          </Link>
        </Box>
      </Popper>
    </div>
  );
}
