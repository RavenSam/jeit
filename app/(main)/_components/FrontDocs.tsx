import { api } from '@/convex/_generated/api'
import { Doc } from '@/convex/_generated/dataModel'
import React from 'react'

export default function FrontDocs({ docs }: { docs:Doc<"documents"> }) {

    

    return (
        <div className='max-w-5xl mx-auto grid grid-cols-4 gap-2'>
            {docs.map(doc => (
                <div key={doc._id} className="border p-4">{doc.title}</div>
            ))}
        </div>
    )
}
