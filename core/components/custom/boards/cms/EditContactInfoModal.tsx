import React from 'react';
// import { Input, Modal, Button, message } from 'antd';

interface IProps {
    contact?: {
        phone: string;
        email: string;
        website: string;
        [index: string]: any;
    };
    visible: boolean;
    type: string;
    onClose: () => void;
}

interface IStates {
    contact?: {
        phone: string;
        email: string;
        website: string;
        [index: string]: any;
    };
    title: string;
    isProgressingSave: boolean;
}

interface ITitles {
    phone: string;
    email: string;
    website: string;
    [index: string]: string;
}

class EditContactInfoModal extends React.Component<IProps, IStates> {
    constructor(props: Readonly<IProps>) {
        super(props);

        this.state = {
            title: '',
            contact: {
                phone: '',
                email: '',
                website: '',
            },
            isProgressingSave: false,
        };
    }

    componentDidUpdate(prevProps: Readonly<IProps>) {
        const { contact, type } = this.props;

        if (contact !== prevProps.contact) {
            this.setState({
                contact,
            });
        }

        if (type !== prevProps.type) {
            const contactTitles: ITitles = {
                email: 'EditEmail',
                phone: 'EditPhone',
                website: 'EditWebsite',
            };

            this.setState({ title: contactTitles[type] });
        }
    }

    setValue = (value: string) => {
        let { contact } = this.state;
        const { type } = this.props;

        // contact[type] = value;

        this.setState({ contact });
    };

    onSave = () => {
        const { isProgressingSave, contact } = this.state;
        const { onClose, type } = this.props;

        if (isProgressingSave === true) return;

        this.setState({ isProgressingSave: true }, () => {
            this.setState({ isProgressingSave: false });
        });
    };

    render() {
        const { isProgressingSave, title, contact } = this.state;
        const { visible, onClose, type } = this.props;

        return (
            <></>
            // <Modal
            //     title={title}
            //     visible={visible}
            //     closable={false}
            //     width="250px"
            //     footer={[
            //         <Button key="back" onClick={onClose}>
            //             Cancel
            //         </Button>,
            //         <Button key="submit" type="primary" loading={isProgressingSave} onClick={this.onSave}>
            //             Save
            //         </Button>,
            //     ]}
            // >
            //     <div className={styles.modalBox}>
            //         <Input style={{ width: '100%', fontSize: '1rem' }} value={contact[type]} onChange={(e) => this.setValue(e.target.value)} />
            //     </div>
            // </Modal>
        );
    }
}

export default EditContactInfoModal;
