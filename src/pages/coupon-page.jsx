import React from "react";
import {useParams} from "react-router-dom";
import {Coupon} from '../components';

export const CouponPage = () => {
    const {couponId} = useParams();

    return (
        <Coupon couponId={couponId}/>
    );
}
