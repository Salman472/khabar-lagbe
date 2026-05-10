"use client"
import { getSocket } from '@/lib/socket';
import React, { useEffect } from 'react';

const GeoLocationUpdater = ({userId}:{userId:string}) => {
    let socket=getSocket()
     socket.emit('identity', userId)
    useEffect(()=>{
        if(!userId || !navigator.geolocation) return
        const watchId=navigator.geolocation.watchPosition((pos)=>{
            const lat=pos.coords.latitude
            const long=pos.coords.longitude
            socket.emit('update-location', {
                userId,
                latitude:lat,
                longitude:long
            })
        },(err)=>{console.log(err);},{enableHighAccuracy:true})
        return ()=>{
            navigator.geolocation.clearWatch(watchId)
        }
    },[userId, socket])
    return null
};

export default GeoLocationUpdater;