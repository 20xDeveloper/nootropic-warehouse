import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const CircleLoader = () => (
    <div>

    
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
       
    </div>
)

export default CircleLoader