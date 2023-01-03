// const sum = (a, b) => {
//     if (a && b) {
//         return a + b
//     }
//     throw new Error('Invalid arguments')
// }
// try {
//     console.log(sum(1));
// } catch (error) {
//     console.log('Error Occurred!');
// }
// console.log('This does works.');

// // https://images.unsplash.com/photo-1494698853255-d0fa521abc6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjc2fHxhcHBsZSUyMHdhdGNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60


// // https://images.unsplash.com/photo-1560863185-a4f6199b5768?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8NjMzMDk2Mzd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60

// // https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8NjMzMDk2Mzd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60

let a = [2, 3, 5, 6, 4, 3, 8, 6, 9, 6, 12, 9]
let b = [];
let c = []
let d = []
let length = a.length;

for (let i = 0; i < length; i++) {
    if (b.indexOf(a[i]) === -1) {
        b.push(a[i])
        console.log(b);
    }
}