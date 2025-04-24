import React, { useState, useEffect } from 'react';
import HomeBanner from '../../component/HomeFeature/HomeBanner';
import MainFeature from '../../component/HomeFeature/MainFeature';
import ProductFeature from '../../component/HomeFeature/ProductFeature';
import NewProductFeature from '../../component/HomeFeature/NewProductFeature';
import HomeBlog from '../../component/HomeFeature/HomeBlog';
import RecommendFeature from '../../component/HomeFeature/RecommendFeature';
import {
    getAllBanner,
    getProductFeatureService,
    getProductNewService,
    getNewBlog,
    getProductRecommendService,
} from '../../services/userService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axiosInstance from '../../services/axiosInstance';
import { toast } from 'react-hot-toast';
import { Container, Row, Col } from 'react-bootstrap';
import Banner from './Banner';
import ProductNew from './ProductNew';
import BlogNew from './BlogNew';

function HomePage(props) {
    const [dataProductFeature, setDataProductFeature] = useState([]);
    const [dataNewProductFeature, setNewProductFeature] = useState([]);
    const [dataNewBlog, setdataNewBlog] = useState([]);
    const [dataBanner, setdataBanner] = useState([]);
    const [dataProductRecommend, setdataProductRecommend] = useState([]);
    const [loading, setLoading] = useState(true);
    let settings = {
        dots: false,
        Infinity: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay: true,
        cssEase: 'linear',
    };
    //  alert("data"+ JSON.stringify(dataProductRecommend.length))
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            fetchProductRecommend(userData.id);
        }
        fetchBlogFeature();
        fetchDataBrand();
        fetchProductFeature();
        fetchProductNew();

        window.scrollTo(0, 0);
    }, []);
    let fetchBlogFeature = async () => {
        let res = await getNewBlog(3);
        if (res && res.errCode === 0) {
            setdataNewBlog(res.data);
        }
    };
    let fetchProductFeature = async () => {
        let res = await getProductFeatureService(4);
        if (res && res.errCode === 0) {
            setDataProductFeature(res.data);
        }
    };
    let fetchProductRecommend = async (userId) => {
        let res = await getProductRecommendService({
            limit: 4,
            userId: userId,
        });
        if (res && res.errCode === 0) {
            setdataProductRecommend(res.data);
        }
    };
    let fetchDataBrand = async () => {
        let res = await getAllBanner({
            limit: 6,
            offset: 0,
            keyword: '',
        });
        if (res && res.errCode === 0) {
            setdataBanner(res.data);
        }
    };
    let fetchProductNew = async () => {
        let res = await getProductNewService(8);
        if (res && res.errCode === 0) {
            setNewProductFeature(res.data);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const [bannerRes, productFeatureRes, productNewRes, blogRes] = await Promise.all([
                axiosInstance.get('/api/get-all-banner'),
                axiosInstance.get('/api/get-product-feature'),
                axiosInstance.get('/api/get-product-new'),
                axiosInstance.get('/api/get-new-blog'),
            ]);

            if (bannerRes && bannerRes.errCode === 0) {
                setdataBanner(bannerRes.data);
            } else {
                console.error('Failed to fetch banners:', bannerRes?.errMessage);
            }

            if (productFeatureRes && productFeatureRes.errCode === 0) {
                setDataProductFeature(productFeatureRes.data);
            } else {
                console.error('Failed to fetch featured products:', productFeatureRes?.errMessage);
            }

            if (productNewRes && productNewRes.errCode === 0) {
                setNewProductFeature(productNewRes.data);
            } else {
                console.error('Failed to fetch new products:', productNewRes?.errMessage);
            }

            if (blogRes && blogRes.errCode === 0) {
                setdataNewBlog(blogRes.data);
            } else {
                console.error('Failed to fetch blogs:', blogRes?.errMessage);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load some content. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '50vh' }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Container fluid className="home-container">
            <Row>
                <Col>
                    <Banner banners={dataBanner} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <ProductFeature title={'Featured products'} data={dataProductFeature} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <ProductNew products={dataNewProductFeature} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <BlogNew blogs={dataNewBlog} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <RecommendFeature data={dataProductRecommend} />
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
