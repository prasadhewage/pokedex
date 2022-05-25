import React from 'react'
import {Header} from './'

export default function Layout(props: any) {
    return (
        <>
            <Header />
            <>
                {props.children}
            </>
        </>
    )
}
