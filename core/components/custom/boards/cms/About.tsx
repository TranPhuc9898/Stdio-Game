import { assign, each } from 'lodash';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { IBoard } from '@stdio/configs/custom-types';
import { useMui } from '@stdio/core/mui/global/MUI';

import styles from './About.module.scss';

interface IProps {
    board: IBoard;
}

const About: FC<IProps> = (props) => {
    const { m } = useMui();
    const { t } = useTranslation('common');
    const dispatch = useDispatch();

    const [board, setBoard] = useState({
        name: '',
        description: '',
        email: '',
        website: '',
        phone: '',
        about: '',
    });

    const aboutRef = useRef<any>();

    useEffect(() => {
        const { name, description, email, website, phone, about } = props.board;
        // setBoard({
        //     name,
        //     description,
        //     email,
        //     website,
        //     phone,
        //     about,
        // });
    }, [props.board]);

    const updateBoard = async () => {
        m.loading(true);
        const updatedBoard = {};

        each(board, (v, k) => {
            assign(updatedBoard, { [k]: v });
        });

        assign(updatedBoard, { about: aboutRef?.current?.value ?? '' });

        // await dispatch(boardActions.updateBoard(props.board._id, updatedBoard));
        m.loading(false);
    };

    return (
        <div className={styles.about}>
            {/* <Row>
                <Col xxl={14} xl={14} lg={14} md={24} xs={24} sm={24}>
                    <Input placeholder={t(LANG.Name)} value={board.name} onChange={(e) => setBoard({ ...board, name: e.target.value })} />
                </Col>
                <Col xxl={14} xl={14} lg={14} md={24} xs={24} sm={24}>
                    <Input
                        placeholder={t(LANG.Description)}
                        value={board.description}
                        onChange={(e) => setBoard({ ...board, description: e.target.value })}
                    />
                </Col>

                <Col xxl={14} xl={14} lg={14} md={24} xs={24} sm={24}>
                    <span>{t(LANG.About)}</span>
                    <div>
                        <BasicEditor editorRef={aboutRef} content={board.about} />
                    </div>
                </Col>

                <Col xxl={14} xl={14} lg={14} md={24} xs={24} sm={24}>
                    <Input placeholder={t(LANG.Email)} value={board.email} onChange={(e) => setBoard({ ...board, email: e.target.value })} />
                </Col>

                <Col xxl={14} xl={14} lg={14} md={24} xs={24} sm={24}>
                    <Input placeholder={t(LANG.Website)} value={board.website} onChange={(e) => setBoard({ ...board, website: e.target.value })} />
                </Col>

                <Col xxl={14} xl={14} lg={14} md={24} xs={24} sm={24}>
                    <Input placeholder={t(LANG.Phone)} value={board.phone} onChange={(e) => setBoard({ ...board, phone: e.target.value })} />
                </Col>
            </Row>

            <Button onClick={updateBoard}>{t(LANG.Save)}</Button> */}
        </div>
    );
};

export default About;
