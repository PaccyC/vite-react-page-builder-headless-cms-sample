import type { BuilderContent } from "@builder.io/sdk-react"
import {
Content,
// fetchEntries,
fetchOneEntry,
isPreviewing,
} from "@builder.io/sdk-react"
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";


const BUILDER_API_KEY= "b344332ee04845dfb06516651715f820";
const Home = () => {
    const [page,setPage]=useState<BuilderContent | null>(null);
    const [loading,setLoading]= useState(true);
    const {"*":path}= useParams() //catch-all route
    const location= useLocation();
    
    const urlPath= "/";

    const fetchData= async()=>{

        try {
            
            const content= await fetchOneEntry({
                apiKey: BUILDER_API_KEY,
                model: "mymodel",
                userAttributes: {urlPath}
            })
            setPage(content);
        } catch (error) {
            console.log(error);
            
        }
        finally{
            setLoading(false)
        }

    }
    useEffect(()=>{
        fetchData();
    },[urlPath])
    console.log('Fetched content:', page);


    const canShowContent= page || isPreviewing(location.pathname);
    console.log(canShowContent);
    

    if(loading){
        return <div>Loading...</div>
    }

    if(!canShowContent){
        return <div>404 - Page not found</div>
    }

  return (
    <>
    <Content model="mymodel" content={page} apiKey={BUILDER_API_KEY}/>
    </>
  )
}

export default Home
