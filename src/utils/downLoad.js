function toOpenSetting() {
    wx.openSetting({
        success: (e) => {
        console.log(e);
        }
    })
}
function rejectSetting(){
    wx.showModal({
        title: '警告',
        content: '授权失败，请打开相册的授权',
        success: (res) => {
            if (res.confirm) { //去授权相册
                toOpenSetting()
            } else if (res.cancel) {//用户点击取消
                wx.showModal({
                    title: '提示',
                    content: '获取权限失败，将无法保存到相册哦~',
                    showCancel: false,
                    success:(res)=>{
                        toOpenSetting();
                    }
                })
            }
        }
    })
}
export function getPhotosAlbumAuth(downForque){
    wx.getSetting({
        success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                scope: 'scope.writePhotosAlbum',
                    success:()=> { //这里是用户同意授权后的回调
                        downForque()
                    },
                    fail:()=> { //这里是用户拒绝授权后的回调
                        showToast({title: '您拒绝了写入相册权限，下载失败', icon: 'none'})
                        rejectSetting()
                    }
                })
            } else { //用户已经授权过了
                downForque()
            }
        }
    })
}
export function download(url, index, total, callback, finishCallBack) {
    // let length = this.data.checkd_list.length
    return new Promise((resolve, reject) => {
        const downloadTask = wx.downloadFile({
            url: url,
            success: function (res) {
                var temp = res.tempFilePath
                wx.saveVideoToPhotosAlbum({
                    filePath: temp,
                    success: function (res) {
                        // wx.showLoading({title: '下载中(' + (index + 1) + '/' + length + ')'})
                        resolve(res)
                        // let fileMgr = wx.getFileSystemManager();
                        // fileMgr.unlink({//删除临时文件
                        //     filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
                        //     success: function (r) {
                        //         console.log("r",r)
                        //     },
                        // })
                    },
                    fail: function (err) {
                        reject(res)
                    }
                })
            },
            fail: function (err) {
                reject(err)
            }
        })
        downloadTask.onProgressUpdate((res) => {
            callback(res.progress)
            if(index===total && res.progress==100){
                // 下载完成
                finishCallBack()
            }
           // console.log('下载进度', res.progress)
           // console.log('已经下载的数据长度', res.totalBytesWritten)
           // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        })
    })
}