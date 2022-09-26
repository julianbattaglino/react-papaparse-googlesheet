import "./MoviesData.css";

import { Box, Image, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from "react";
import Papa from "papaparse";


const MoviesData = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vSUpx9h5ioJno_cJ8pw9Er33m92YTeVzOht3b4Og9RKSm9jq1FZsnOISpRXZXr371eikag-Xg3FMbXX/pub?output=csv", {
            download: true,
            header: true,
            complete: (results) => {
                setData(results.data);

            },
        });

        setData(data);
    }, []);


    //map projects to display on page 
    const moviesGrid = data.map(item => {

        return (
            <>
                <Box className="card-item" key={item.movie} maxW='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>

                    <Image className="card-img" src={item.imgUrl} alt="" />

                    <Box p='6'>
                        <Box display='flex' alignItems='baseline'>
                            <Box className="movie-title" as="h2">
                                {item.movie}
                            </Box>
                        </Box>

                        <Box className="project-title" mt='1' fontWeight='semibold' lineHeight='tight' noOfLines={1}>
                            {item.extract}
                        </Box>

                        <Box>
                            <Box as='span' color='gray.600' fontSize='sm'>
                                {item.year}
                            </Box>
                        </Box>

                        <Box>
                            <Box as='span' color='gray.600' fontSize='sm'>
                                {item.director}
                            </Box>
                        </Box>


                        <Box>
                            <Link href={item.url} isExternal>
                                Movie link <ExternalLinkIcon mx='2px' />
                            </Link>            </Box>


                    </Box>
                </Box>
            </>

        );
    });

    return (
        <div className="intro-container">
            <h1 className="main-title"><span class="underline-nice">Papa Parse to fetch data from a Google Sheet into React.</span></h1>
            <div className="grid-container">{moviesGrid}</div>

        </div>
    );
};

export default MoviesData;