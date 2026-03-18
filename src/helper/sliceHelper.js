export const getData = (state, action) => {
    state.list = action.payload;
};

export const addData = (state, action) => {
    state.list.push(action.payload);
};

export const updateData = (state, action) => {
    state.list = state.list.map((product) =>
        product.id === action.payload.id ? { ...action.payload, ...action.payload } : product
    );
};