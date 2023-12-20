import React from 'react'
import styles from './ContextMenu.module.css'

interface ContextMenuProps {
    position: { top: number; left: number }
    onClose?: () => void
    onDelete: () => void
}

const ContextMenu: React.FC<ContextMenuProps> = (props) => {
    return (
        <div
            className={styles.contextMenu}
            style={{
                top: props.position.top,
                left: props.position.left,
            }}
        >
            <div className={styles.contextMenuItem} onClick={props.onDelete}>
                Удалить
            </div>
        </div>
    )
}

export { ContextMenu }
