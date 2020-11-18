export const updateObjectInArray = (items: Array<any>, itemId: number, objPropName: string, newObjProps: any): any => { ///////?????????????????????
    items.map(u => {
        if(u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}