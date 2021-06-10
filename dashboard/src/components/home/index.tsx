import React from "react";
import {HomeView} from "./home.view";

const Home = (): React.ReactElement => {

    React.useEffect(()=>{
    }, [])

    return <HomeView connect={connect} consume={consume} produce={produce} create={createRoom} join={joinRoom} stream={stream} value={peerId} onChange={onChange}/>
}

export {Home}

