import React from 'react'
import styles from './ContextMenu.module.css'

interface ContextMenuProps {
    position: { top: number; left: number }
    onClose?: () => void // Возможно, вам потребуется обработчик для закрытия меню
    onDelete: () => void
}

const ContextMenu: React.FC<ContextMenuProps> = (props) => {
    return (
        <div
            className={styles.contextMenu}
            style={{
                position: 'absolute',
                top: props.position.top,
                left: props.position.left,
                // background: 'white',
                // border: '1px solid #ccc',
                // padding: '5px',
                // cursor: 'pointer',
                // zIndex: 999,
            }}
        >
            <div className={styles.contextMenuItem} onClick={props.onDelete}>
                Удалить
            </div>
        </div>
    )
}

export { ContextMenu }
