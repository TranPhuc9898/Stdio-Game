import React from 'react';

interface IProps {
    profile?: {
        firstName: string;
        lastName: string;
        country: string;
        dob: string;
        gender: string;
        job: string;
        [index: string]: any;
    };
    visible: boolean;
    type: string;
    onClose: () => void;
}

interface IStates {
    profile: {
        firstName: string;
        lastName: string;
        country: string;
        dob: string;
        gender: string;
        job: string;
        [index: string]: any;
    };
    title: string;
    isProgressingSave: boolean;
}

interface ITitles {
    name: string;
    dob: string;
    gender: string;
    job: string;
    bio: string;
    [index: string]: string;
}

class EditPersonalInfoModal extends React.Component<IProps, IStates> {
    constructor(props: Readonly<IProps>) {
        super(props);

        const { profile } = this.props;
        this.state = {
            title: '',
            profile: {
                firstName: 'Phu',
                lastName: 'Nguyen',
                country: 'Vietnam',
                dob: '05052000',
                gender: 'Male',
                job: 'Student',
            },
            isProgressingSave: false,
        };
    }

    componentDidUpdate(prevProps: Readonly<IProps>) {
        const { profile, type } = this.props;
        if (profile !== prevProps.profile) {
            // this.setState({ profile });
        }

        if (type !== prevProps.type) {
            const personalTitles: ITitles = {
                name: 't(LANG.EditName)',
                dob: 't(LANG.EditDOB)',
                gender: 't(LANG.EditGender)',
                job: 't(LANG.EditJob)',
                bio: 't(LANG.EditBio)',
            };
            this.setState({ title: personalTitles[type] });
        }
    }

    onSave = () => {
        const { profile, isProgressingSave } = this.state;
        const { onClose, type } = this.props;

        if (isProgressingSave === true) return;
    };

    setValue = (value: any, nameType = '') => {
        let { profile } = this.state;
        const { type } = this.props;

        switch (nameType) {
            case 'first':
                profile.firstName = value;
                break;
            case 'last':
                profile.lastName = value;
                break;
            default:
                profile[type] = value;
                break;
        }

        this.setState({ profile });
    };

    renderModalContext = (_value: any) => {
        return null;
        // const { profile } = this.state;
        // const { type } = this.props;
        // switch (type) {
        //     case 'gender':
        //         const genderOptions = [
        //             { value: 'male', text: 'Nam' },
        //             { value: 'female', text: 'Nữ' },
        //             { value: 'other', text: 'Khác' },
        //         ];
        //         return (
        //             <Select style={{ width: '100%' }} onChange={(gender) => this.setValue(gender)} value={profile.gender}>
        //                 {genderOptions.map((genderOption, index) => {
        //                     return (
        //                         <Select.Option value={genderOption.value} key={index}>
        //                             {genderOption.text}
        //                         </Select.Option>
        //                     );
        //                 })}
        //             </Select>
        //         );
        //     case 'dob':
        //         return (
        //             <DatePicker style={{ width: '100%' }} onChange={(dob) => this.setValue(dob)} format="DD/MM/YYYY" value={moment(profile.dob)} />
        //         );
        //     case 'name':
        //         return (
        //             <>
        //                 {/* <h4>{t(LANG.FirstName)}</h4> */}
        //                 <Input
        //                     defaultValue={profile.firstName}
        //                     onChange={(e) => this.setValue(e.target.value, 'first')}
        //                     style={{ fontSize: '1rem' }}
        //                 />
        //                 {/* <h4>{t(LANG.LastName)}</h4> */}
        //                 <Input defaultValue={profile.lastName} onChange={(e) => this.setValue(e.target.value, 'last')} style={{ fontSize: '1rem' }} />
        //             </>
        //         );
        //     // Use for bio and job
        //     default:
        //         return <Input style={{ width: '100%', fontSize: '1rem' }} value={profile[type]} onChange={(e) => this.setValue(e.target.value)} />;
        // }
    };

    render() {
        const { isProgressingSave, profile, title } = this.state;
        const { visible, onClose, type } = this.props;

        const value = profile[type];

        return (
            <div>
                <div>
                    {/* <Modal
                        title={title}
                        visible={visible}
                        closable={false}
                        width="250px"
                        footer={[
                            <Button key="back" onClick={onClose}>
                                {t(L.Cancel)}
                            </Button>,
                            <Button key="submit" type="primary" loading={isProgressingSave} onClick={this.onSave}>
                                {t(L.Save)}
                            </Button>,
                        ]}
                    >
                        <div className={styles.modalBox}>{this.renderModalContext(value)}</div>
                    </Modal> */}
                </div>
            </div>
        );
    }
}

export default EditPersonalInfoModal;
