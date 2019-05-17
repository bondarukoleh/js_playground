function aa(){
  console.log(f())
}
// const a = f() // error
// aa() // error because we invoking aa before f is initialized
const f = () => 1;
// aa() // not error because we invoking aa has access to [[outer]] scope where f is already initialized.
// console.log(a)

