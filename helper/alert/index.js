export function Alert(obj, title = 'Thông Báo', body = 'Thành Công', type = 'success') {
  obj._vm.$bvToast.toast(body, {
    title,
    variant: type,
    solid: true,
    toaster: 'b-toaster-bottom-right',
    autoHideDelay: 3000,
  })
}
