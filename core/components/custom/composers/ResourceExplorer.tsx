import React, { FC, useEffect } from 'react';
// import { Drawer, Button, Row, Col } from 'antd';

interface IProps {
    // resources: string[];
    documentId: string;
    button: any;
}

const ResourceExplorer: FC<IProps> = ({ documentId, button }) => {
    const [visible, setVisible] = React.useState(false);
    const [] = React.useState([]);

    const getData = () => {
        // ArticleAPI.getContentImages(documentId).then(res => {
        //     console.log(res.data);
        // });
    };

    useEffect(() => {
        if (documentId) {
            getData();
        }
    }, [documentId]);

    return (
        <>
            {/* <Button
                icon={button.icon}
                onClick={() => {
                    setVisible(true);
                }}
            >
                {button.text}
            </Button>

            <Drawer
                title="Thư viện cho bài viết"
                placement="left"
                width="80%"
                height="100%"
                destroyOnClose={true}
                closable={true}
                maskClosable={false}
                keyboard={false}
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
            >
                <div className={styles.resourceExplorer}>
                    <div className={styles.resources}>
                        <Row gutter={[10, 10]}>
                            <Col xxl={3} xl={4} lg={6} md={6} sm={8} xs={12}>
                                <div className={styles.resource}>
                                    <div className={styles.thumbnail}>
                                        <img src={'/static/shared/article-thumbnail.jpg'} />
                                    </div>
                                    <div className={styles.title}>
                                        <p>3953934kdajklfjadlkfjafd943.png</p>
                                        <p>
                                            <span>PNG</span>
                                        </p>
                                    </div>
                                    <div className={styles.action}>
                                        <div className={styles.button}>
                                            <DeleteOutlined />
                                        </div>
                                        <div className={styles.button}>
                                            <CopyOutlined />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Drawer> */}
        </>
    );
};

export default ResourceExplorer;
