import React from 'react';
import {
        ErrBody,
        SuccessBody } from '../Stylesheets/notification.styled'

export const ErrMessage = (message) => {
    return (
        <>
            <ErrBody>
                {message}
            </ErrBody>
        </>
    )
}

export const SuccessMessage = (message) => {
    return (
        <>
            <SuccessBody>
                {message}
            </SuccessBody>
        </>
    )
}