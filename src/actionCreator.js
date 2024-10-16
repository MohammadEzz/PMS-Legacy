
export function drugActionCreator(type, payload = null) {
    return {
      type: type,
      payload: payload
    };
}

