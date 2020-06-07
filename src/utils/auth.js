function isLogin () {
    return document.cookie.includes('login=true');
}

function login () {
    const expiresDay = 147;
    const date = new Date();
    date.setTime(date.getTime() + expiresDay * 24 * 60 * 60 * 1000 );
    console.log(typeof date)
    document.cookie = `login=true;expires=${date.toUTCString()}`; //时间对象转换成字符串
}

function cancelLogin () {
    const date = new Date();
    date.setTime(date.getTime() - 100000000000);
    document.cookie = `login=true;expires=${date.toUTCString()}`;
}

export default {
    isLogin,
    login,
    cancelLogin
}