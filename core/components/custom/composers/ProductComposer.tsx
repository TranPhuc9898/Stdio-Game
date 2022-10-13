import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IAffiliateProduct } from '@stdio/configs/custom-types';

import styles from './ZComposer.module.scss';

interface IProps {
    initialProduct?: IAffiliateProduct;
}

const ProductComposer: FC<IProps> = (initialProduct) => {
    // const { m } = useMui();

    const dispatch = useDispatch();

    const hdThumbnailEditorRef = useRef<any>(null);
    const sqThumbnailEditorRef = useRef<any>(null);

    // const imgThumbnailSquare = getMediaURL((initialProduct?.thumbnailSquare as string[])[0] ?? '');
    // const imgThumbnailHD = getMediaURL((initialProduct?.thumbnailHD as string[])[0] ?? '');

    const [product, setProduct]: [IAffiliateProduct, any] = useState({});

    useEffect(() => {
        const fixEditor = () => {
            try {
                const toolbar = document.getElementsByClassName(
                    'tox-editor-header',
                ) as HTMLCollectionOf<HTMLElement>;
                const cssText = toolbar?.[0].style.cssText ?? '';
                if (cssText.includes('position: fixed')) toolbar[0].style.top = '54px';
            } catch (err) {
                console.log(err);
            }
        };

        window.addEventListener('scroll', fixEditor);

        return () => {
            window.removeEventListener('scroll', fixEditor);
        };
    });

    useEffect(() => {
        setProduct(initialProduct);
    }, [initialProduct]);

    const changeField = (key: string, value: any) => {
        let patchedProduct: IAffiliateProduct = { ...product };
        patchedProduct[key] = value;

        setProduct(patchedProduct);
    };

    const changeShopData = (value: any, type: string, index: number) => {
        let shopData = [...(product?.shopData ?? [])];

        // shopData[index][type] = value;

        setProduct({ ...product, shopData });
    };

    const save = async () => {
        // m.loading(true);
        // const resp = await dispatch(
        //     productActions.updateAffiliateProduct(initialProduct._id, {
        //         ...product,
        //     }),
        // );
        // if (resp.success) m.message('success', 'Lưu thành công');
        // else if (!resp.success) m.message('error', 'Lưu thất bại');
        //m.loading(false);
    };

    return (
        <div className={styles.composer}>
            {/* <Row gutter={[10, 10]}>
                <Col xxl={6} xl={6} lg={7} md={12} sm={24} xs={24}>
                    <div className={styles.component}>
                        <div className={styles.componentTitle}>INFO</div>
                        <div className={styles.componentContent}>
                            <div className={styles.content}>
                                <h4>Title</h4>
                                <Input value={product.title} onChange={(e: any) => changeField('title', e.target.value)} />
                                <h4>Headline</h4>
                                <Input.TextArea value={product.headline} onChange={(e: any) => changeField('headline', e.target.value)} />
                                <h4>Keyword</h4>
                                <Input.TextArea value={product.keywords} onChange={(e: any) => changeField('keywords', e.target.value)} />
                                <h4>Description</h4>
                                <Input.TextArea value={product.description} onChange={(e: any) => changeField('description', e.target.value)} />
                                <h4>Original price (giá chung)</h4>
                                <InputNumber
                                    className={styles.inputNumber}
                                    value={product?.originalPrice ?? 0}
                                    onChange={(e: any) => changeField('originalPrice', e)}
                                />
                                <h4>Sale price (giá chung)</h4>
                                <InputNumber
                                    className={styles.inputNumber}
                                    value={product?.salePrice ?? 0}
                                    onChange={(e: any) => {
                                        changeField('salePrice', e);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.component}>
                        <div className={styles.componentTitle}>DETAILS</div>
                        <div className={styles.componentContent}>
                            <div className={styles.content}>
                                <p>Product id: {initialProduct._id}</p>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xxl={12} xl={12} lg={10} md={24} sm={24} xs={24}>
                    <Row gutter={[5, 5]}>
                        {!isEmpty(product?.shopData ?? []) &&
                            product.shopData.map((d, index) => (
                                <Col span={12} key={index}>
                                    <div className={styles.component}>
                                        <div className={styles.componentTitle}>
                                            {d.shopType.toUpperCase()}
                                            <div style={{ float: 'right' }}>
                                                <Checkbox
                                                    checked={d?.isPublished ?? false}
                                                    onChange={(e: any) => changeShopData(e.target.checked, 'isPublished', index)}
                                                />
                                                <span> published?</span>
                                            </div>
                                        </div>
                                        <div className={styles.componentContent}>
                                            <div className={styles.content}>
                                                <h4>Affiliate link</h4>
                                                <Input
                                                    value={d?.affiliateLink ?? ''}
                                                    onChange={(e: any) => changeShopData(e.target.value, 'affiliateLink', index)}
                                                />
                                                <h4>Anchor text</h4>
                                                <Input
                                                    value={d?.anchorText ?? ''}
                                                    onChange={(e: any) => changeShopData(e.target.value, 'anchorText', index)}
                                                />
                                                <h4>Shop Id</h4>
                                                <Input
                                                    value={d?.shopId ?? ''}
                                                    onChange={(e: any) => changeShopData(e.target.value, 'shopId', index)}
                                                    disabled={true}
                                                />
                                                <h4>Product Id</h4>
                                                <Input
                                                    value={d?.productId ?? ''}
                                                    onChange={(e: any) => changeShopData(e.target.value, 'productId', index)}
                                                    disabled={true}
                                                />
                                                
                                                <h4>Shop type</h4>
                                                <Input
                                                    value={d?.shopType ?? ''}
                                                    onChange={(e: any) => changeShopData(e.target.value, 'shopType', index)}
                                                    disabled={true}
                                                />

                                                <div>
                                                    <Checkbox
                                                        checked={d?.queryablePrice ?? false}
                                                        onChange={(e: any) => changeShopData(e.target.checked, 'queryablePrice', index)}
                                                    />
                                                    <span> Queryable price</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                    </Row>
                </Col>

                <Col xxl={6} xl={6} lg={7} md={12} sm={24} xs={24}>
                    <div className={styles.component}>
                        <div className={styles.componentTitle}>THUMBNAILS</div>
                        <div className={styles.componentContent}>
                            <div className={[styles.thumbnail, styles.hq].join(' ')}>
                                <div className={styles.box}>
                                    <img src={imgThumbnailHD} alt="" />
                                </div>
                                <div className={styles.buttons}>
                                    <BasicMenuContext
                                        trigger={['hover']}
                                        placement="bottomRight"
                                        items={[
                                            {
                                                icon: <PictureOutlined />,
                                                text: 'Cập nhật ảnh (16:9)',
                                                onClick: () => {
                                                    hdThumbnailEditorRef.current.click();
                                                },
                                            },
                                            {
                                                icon: <DeleteOutlined />,
                                                text: 'Xóa ảnh',
                                                onClick: () => {},
                                            },
                                        ]}
                                        button={
                                            <div className={styles.button}>
                                                <PictureOutlined />
                                            </div>
                                        }
                                    />
                                    <ImageUploadEditor
                                        width={(1920 / 4) * 2}
                                        height={(1080 / 4) * 2}
                                        borderRadius={0}
                                        ref={hdThumbnailEditorRef}
                                        onUpload={async (file: any) => {
                                            Utils.loading(true);
                                            await dispatch(productActions.uploadAffiliateProductThumbnailHD(product._id, file));
                                            await dispatch(productActions.getAffiliateProduct(product._id));
                                            Utils.loading(false);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={[styles.thumbnail, styles.sq].join(' ')}>
                                <div className={styles.box}>
                                    <img src={imgThumbnailSquare} alt="" />
                                </div>
                                <div className={styles.buttons}>
                                    <BasicMenuContext
                                        trigger={['hover']}
                                        placement="bottomRight"
                                        items={[
                                            {
                                                icon: <PictureOutlined />,
                                                text: 'Cập nhật ảnh (1:1)',
                                                onClick: () => {
                                                    sqThumbnailEditorRef.current.click();
                                                },
                                            },
                                            {
                                                icon: <DeleteOutlined />,
                                                text: 'Xóa ảnh',
                                                onClick: () => {},
                                            },
                                        ]}
                                        button={
                                            <div className={styles.button}>
                                                <PictureOutlined />
                                            </div>
                                        }
                                    />
                                    <ImageUploadEditor
                                        width={1024 / 2}
                                        height={1024 / 2}
                                        borderRadius={0}
                                        ref={sqThumbnailEditorRef}
                                        onUpload={async (file: any) => {
                                            Utils.loading(true);
                                            await dispatch(productActions.uploadAffiliateProductThumbnailSquare(product._id, file));
                                            await dispatch(productActions.getAffiliateProduct(product._id));
                                            Utils.loading(false);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.content}>
                                <ResourceExplorer
                                    // resources={product.resource}
                                    documentId={initialProduct._id}
                                    button={{
                                        icon: <FolderOpenOutlined />,
                                        text: 'Media',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.component}>
                        <div className={styles.componentTitle}>PROPERTIES</div>
                        <div className={styles.componentContent}>
                            <Checkbox
                                onChange={(e: any) =>
                                    setProduct({
                                        ...product,
                                        isPublished: e.target.checked,
                                    })
                                }
                                checked={product?.isPublished ?? false}
                            >
                                Công khai
                            </Checkbox>
                        </div>
                    </div>

                    <div className={styles.component}>
                        <div className={styles.componentTitle}>ACTIONS</div>
                        <div className={styles.componentContent}>
                            <Button type="primary" onClick={save}>
                                Save
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row> */}
        </div>
    );
};

export default ProductComposer;
