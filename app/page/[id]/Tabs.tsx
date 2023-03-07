import React, { useState } from "react"

interface tabProps {
    items: Array<any>
}

export default function Tab(props: tabProps) {

    const [items, setItems] = useState(props.items)

    function show(_: any, index: number) {
        let tabs = items;

        tabs.map((item, item_index) => {

            item.is_active = false
            if (item_index == index) {
                item.is_active = true
            }

            return tabs
        })

        setItems([...tabs])
    }


    return (
        <React.Fragment>
            <div className={'tab'} >
                <ul className={'tab-list'}>
                    {
                        items.map((item, index) => {
                            return (
                                <li key={index} onClick={(event) => show(event, index)}
                                    className={`tab-item ${(item['is_active']) ? 'active' : ''} `} >
                                    <span>{item['name']}</span>
                                </li>
                            )
                        })
                    }

                </ul>

                <div className={'tab-container'} >

                    {
                        items.map((item, index) => {
                            return (
                                <div key={index}
                                    className={`tab-content ${(item['is_active']) ? 'active' : 'notactive'}`}>
                                    {item['content']}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
