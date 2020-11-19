import React from 'react'
import Preloader from '../components/Common/Preloader/Preloader'


export const withSuspense = (Component: any) => {
    return (props: any) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...props} />
        </React.Suspense>

    }

}

