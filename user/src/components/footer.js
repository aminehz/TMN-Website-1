import { SimpleGrid,Button, Text, TextInput, ActionIcon, MediaQuery,Group } from '@mantine/core';
import { makeStyles } from '@mui/styles';
import React from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    const hide = { display: "none" };
    const useStyles = makeStyles({
        button: {
          backgroundColor: "#000",
          color: "#fff",
          marginTop: 0,
          borderRadius: "0px",
          borderColor:'#fff',
          borderWidth:'2px',
          marginLeft:20,
          "&:hover": {
            backgroundColor: "#fff !important",
            color: "#000",
          },
        },
        fcb: {
            color: "#ffffff",
            fontSize:'500px',
            "&:hover": {
                
              color: "#555",
            },
          },
    });

    const classes = useStyles();



    return ( 
        <div>
            <MediaQuery largerThan="md" styles={hide}>
            <SimpleGrid cols={3} style={{position:'relative',bottom:0,left:0,width:'100%', height:'200px', backgroundColor:'#000000', marginTop:'150px'}} position="center">
                <div style={{ width:'100%', height: '100%', display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                     <Text style={{fontSize:'26px',marginLeft:'20px', fontWeight:700, color:'#fff',display:'flex',alignSelf:'flex-start'}}>Newsletter</Text>
                     <Text style={{fontSize:'14px', marginLeft:'20px', color:'#fff'}}>Want to know what we're up to? sign up for the newsletter and join our tribe</Text>
                     <div style={{display:'flex',flexDirection:'row', marginTop:'20px', marginLeft:'20px',alignSelf:'flex-start', width:'90%'}}>
                         <TextInput icon={<EmailOutlinedIcon style={{ color: "#000000", fontSize:'18px' }} />} radius={0} style={{borderRadius:'0px', width:'100%'}}></TextInput>
                         <Button className={classes.button}>Subscribe</Button>
                     </div>
                </div>
                <div style={{width:'100%', height: '100%', display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Text style={{fontSize:'26px',marginLeft:'20px', fontWeight:700, color:'#fff', marginTop:'-30px'}}>Follow Us</Text>
                <div style={{display:'flex',flexDirection:'row', marginTop:'20px', marginLeft:'20px'}}>
                <ActionIcon variant="transparent" size="xl" style={{marginLeft:20, marginRight:20}}>
                    <FacebookRoundedIcon className={classes.fcb} style={{fontSize:'46px'}} />
                </ActionIcon>
                <ActionIcon variant="transparent" size="xl" style={{marginLeft:20, marginRight:20}} >
                    <YouTubeIcon className={classes.fcb} style={{fontSize:'46px'}} />
                </ActionIcon>
                <ActionIcon variant="transparent" size="xl" style={{marginLeft:20, marginRight:20}}>
                    <InstagramIcon className={classes.fcb} style={{fontSize:'46px'}} />
                </ActionIcon>
                
                </div>
                </div>
                <div style={{width:'100%', height: '100%', display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <Text style={{fontSize:'26px',marginRight:'20px', fontWeight:700, color:'#fff',display:'flex',alignSelf:'flex-end', marginTop:'-30px'}}>About Us</Text>
                    <Text style={{fontSize:'14px', marginRight:'20px',marginLeft:'20px', color:'#fff',textAlign: 'justify',textJustify: 'inter-word'}}>
                        The mouth of the just shall meditate wisdom
                        And his language shall be spoken in judgment.
                        Blessed is he who suffers temptation
                        Since he, with approval, shall receive the crown of life
                    </Text>
                 </div>
            </SimpleGrid>
            </MediaQuery>
            <MediaQuery smallerThan="md" styles={hide}>
            <Group direction="column" style={{position:'relative',bottom:0,left:0,width:'100%', height:'500px', backgroundColor:'#000000', marginTop:'150px'}} position="center">
                <div style={{ width:'100%', height: '100%', display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                     <Text style={{fontSize:'26px',marginLeft:'20px',marginTop:'20px', fontWeight:700, color:'#fff',display:'flex',alignSelf:'flex-start'}}>Newsletter</Text>
                     <Text style={{fontSize:'14px', marginLeft:'20px', color:'#fff',display:'flex',alignSelf:'flex-start'}}>Want to know what we're up to? sign up for the newsletter and join our tribe</Text>
                     <div style={{display:'flex',flexDirection:'row', marginTop:'20px', marginLeft:'20px',alignSelf:'flex-start', width:'90%'}}>
                         <TextInput icon={<EmailOutlinedIcon style={{ color: "#000000", fontSize:'18px' }} />} radius={0} style={{borderRadius:'0px', width:'100%'}}></TextInput>
                         <Button className={classes.button}>Subscribe</Button>
                     </div>
                     <div style={{width:'100%', height: '100%', display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Text style={{fontSize:'26px',marginLeft:'20px', fontWeight:700, color:'#fff', marginTop:'30px'}}>Follow Us</Text>
                <div style={{display:'flex',flexDirection:'row', marginTop:'20px', marginLeft:'20px'}}>
                <ActionIcon variant="transparent" size="xl" style={{marginLeft:20, marginRight:20}}>
                    <FacebookRoundedIcon className={classes.fcb} style={{fontSize:'46px'}} />
                </ActionIcon>
                <ActionIcon variant="transparent" size="xl" style={{marginLeft:20, marginRight:20}} >
                    <YouTubeIcon className={classes.fcb} style={{fontSize:'46px'}} />
                </ActionIcon>
                <ActionIcon variant="transparent" size="xl" style={{marginLeft:20, marginRight:20}}>
                    <InstagramIcon className={classes.fcb} style={{fontSize:'46px'}} />
                </ActionIcon>
                
                </div>
                </div>
                <div style={{width:'100%', height: '100%', display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <Text style={{fontSize:'26px',marginLeft:'20px', fontWeight:700, color:'#fff',display:'flex',alignSelf:'flex-start', marginTop:'30px'}}>About Us</Text>
                    <Text style={{fontSize:'14px', marginRight:'20px',marginLeft:'20px', color:'#fff',textAlign: 'justify',textJustify: 'inter-word'}}>
                        The mouth of the just shall meditate wisdom
                        And his language shall be spoken in judgment.
                        Blessed is he who suffers temptation
                        Since he, with approval, shall receive the crown of life
                    </Text>
                 </div>
                </div>
                
                
            </Group>

            </MediaQuery>
            </div>
        
     );
}

export default Footer;