import React from 'react';
import Modal from 'antd/lib/modal/Modal';

const ModalForm = ({titleModal, active, setActive, children}: any) => {
    return (
        <Modal destroyOnClose={true} title={titleModal} visible={active} footer = {""} onCancel={() => setActive(false)}>
            {children}
        </Modal>
    );
};

export default ModalForm;