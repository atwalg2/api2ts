const isArray = Array.isArray;
const isObject = (A: any) => {
  return (typeof A === "object" || typeof A === 'function') && (A !== null)
}

export const traverseAndReplace = (obj: any): any => {
  // we just want the first element of the array
  if (isArray(obj)) {
    const oKeys = Object.keys(obj);

    // return object with most keys
    if (isObject(obj[oKeys[0] as any])) {
      const sortedBiggestObject = obj.sort((a, b) => Object.keys(a).length < Object.keys(b).length ? 1 : -1);
      return [traverseAndReplace(sortedBiggestObject[0])]
    }
    
    return [traverseAndReplace(obj[0])]
  }
  
  // it's an object and we should keep traversing
  if (isObject(obj)) {
    let finalForm: any = {};
    const keys = Object.keys(obj);
    for (let oKey of keys) {
      finalForm[oKey] = traverseAndReplace(obj[oKey]);
    }
    return finalForm;
  } else {
    // it's a simple type we can't do more with
    return obj
  }
}