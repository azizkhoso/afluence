import { useState } from 'react';
import {Grid, Button, IconButton, InputBase} from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import clsx from 'clsx';

import AddCircle from '@material-ui/icons/AddCircle';
import NegativeIcon from '../../assets/negative.png';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DrawerData from './DrawerData';

const useStyles = makeStyles((theme) => ({
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('xs')]:{
            zIndex: 10,
            position: 'absolute',
            height: 200
        },
        [theme.breakpoints.up('sm')]:{
            width: '70%',
            flexGrow: 1
        }
    },
    drawerOpen: {
        [theme.breakpoints.down('xs')]:{
            width: '80%',
            right: 0,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }
    },
    drawerClose: {
        [theme.breakpoints.down('xs')]:{
            right: 0,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: 0
        }
    },
}))

const activeColor = 'rgba(228, 212, 248, 1)';

export default function AddStateTab(props){
    const classes = useStyles();
    let [open, setOpen] = useState(false);
    let [name, setName] = useState('');
    let [onEnterFunctions, setOnEnterFunctions] = useState([]);
    let [onInputFunctions, setOnInputFunctions] = useState([]);
    let [drawerData, setDrawerData] = useState(null);
    return (
        <Grid container direction="column" className="border rounded-lg overflow-scroll sm:overflow-auto flex-nowrap">
            <Grid item className="flex gap-3 p-2 sm:p-3 border-b items-center justify-between flex flex-col md:flex-row bg-white">
                <InputBase 
                    placeholder="Enter State Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full md:w-6/12 px-2 bg-gray-100 h-10 rounded-lg"
                />
                <div className="flex gap-9 md:justify-end w-full md:w-5/12 items-center justify-between">
                    <Button variant="contained" color="secondary" className="w-36">Cancel</Button>
                    <Button variant="contained" color="primary" className="w-36">Save</Button>
                </div>
            </Grid>
            <Grid item className="md:pl-5 flex relative md:gap-5 lg:gap-30 bg-gray-100 flex-grow items-start justify-around">
                <div className="border rounded-lg w-60 bg-gray-200 flex flex-col divide-y my-9">
                    <div className="p-1 sm:p-3 text-center flex flex-col flex-grow">
                        <Hidden smUp><IconButton className="self-end"><ChevronLeftIcon className="bg-gray-400" onClick={()=>setOpen(true)} /></IconButton></Hidden>
                        <span className="self-center">{name ? name : '...'}</span>
                    </div>
                    <div className="p-1 sm:px-3 flex flex-col flex-grow bg-white items-center">
                        <div className="flex items-center justify-between w-full">
                            <p className="flex-grow p-2 rounded-lg">onEnter</p><span><IconButton><AddCircle /></IconButton></span>
                        </div>
                        {   onEnterFunctions.map((item, index) => (
                                <div className="flex items-center justify-between w-full md:gap-8 gap-2" onClick={()=>setDrawerData(onEnterFunctions[index])}>
                                    <span className={`${drawerData?.name === item.name ? 'bg-activeTab' : 'bg-gray-100'} w-full p-2 rounded-lg hover:bg-activeTab`}>{item.name}</span>
                                    <IconButton><img src={NegativeIcon} alt="delete" style={{maxHeight: 22}} /></IconButton>
                                </div>
                            ))
                        }
                    </div>
                    {   onInputFunctions && 
                        <div className="p-1 sm:px-3 flex flex-col flex-grow bg-white items-center rounded-b-lg">
                            <div className="flex items-center justify-between w-full">
                                <p className="flex-grow p-2 rounded-lg">onInput</p><span><IconButton><AddCircle /></IconButton></span>
                            </div>
                            {   onInputFunctions.map((item, index) =>(
                                <div className="flex items-center justify-between w-full md:gap-8 gap-2" onClick={()=>setDrawerData(onInputFunctions[index])}>
                                    <span className={`${drawerData?.name === item.name ? 'bg-activeTab' : 'bg-gray-100'} w-full p-2 rounded-lg hover:bg-activeTab`}>{item.name}</span>
                                    <IconButton><img src={NegativeIcon} alt="delete" style={{maxHeight: 22}} /></IconButton>
                                </div>
                                ))
                            }
                        </div>
                    }
                </div>
                <div style={{minHeight: '100%'}} className={clsx({"bg-white absolute md:relative sm:ml-0 flex-grow flex flex-col border-gray-200 border-l":true, [classes.drawerOpen]: open, [classes.drawerClose]:!open})}>
                    <Hidden smUp><IconButton className="self-start"><ChevronRightIcon className="bg-gray-400" onClick={()=>setOpen(false)}/></IconButton></Hidden>
                    <DrawerData data={drawerData} />
                </div>
            </Grid>
        </Grid>
    )
}