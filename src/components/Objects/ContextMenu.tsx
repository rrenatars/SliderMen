import React from 'react'
import styles from './ContextMenu.module.css'
import { useAppActions, useAppSelector } from '../../redux/hooks'

interface ContextMenuProps {
    position: { top: number; left: number }
    onClose?: () => void
}

const ContextMenu: React.FC<ContextMenuProps> = (props) => {
    const selection = useAppSelector((state) => state.selection)
    const { createDeleteObjectAction } = useAppActions()

    if (selection.slideId !== undefined && selection.objectId !== undefined) {
        return (
            <div
                className={styles.contextMenu}
                style={{
                    top: props.position.top,
                    left: props.position.left,
                }}
            >
                <div
                    className={styles.contextMenuItem}
                    onClick={() =>
                        createDeleteObjectAction(
                            selection.objectId as string,
                            selection.slideId as string,
                        )
                    }
                >
                    Удалить
                </div>
            </div>
        )
    }

    return null // Используем null вместо false
}

export { ContextMenu }
