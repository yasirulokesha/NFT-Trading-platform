import { Container, Stack } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Assest, CustomLink } from "../Components/Components"

export default function SearchResults(props) {
    const [results, setResults] = useState(Array())
    const key = props.keyword
    useEffect(() => {
        axios.
            get(`http://127.0.0.1:8000/search/?keyword=${key}`)
            .then((response) => {
                setResults(response.data);
                console.log("Set", results);
            })
            .catch((error) => {
                console.error('Error while fetching search results:', error);
            });
    }, [key])

    return (
        <div>
            <Stack flexWrap='wrap' flexDirection='row'>
                {results.map((result) => (
                    <CustomLink element={<Assest src={result['asset']} name={result['name']} price={result['price']} />} to={`/` + result["id"]} />
                ))}
            </Stack>
        </div>
    )
}