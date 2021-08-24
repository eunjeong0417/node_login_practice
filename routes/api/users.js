const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');



//register user
//post request
router.post('/', [
    check('name', '이름을 입력하세요')
        .not()
        .isEmpty(),
    check('email', '이메일을 확인하세요')
        .isEmail(),
    check('password', '비밀번호는 최소 6자리 이상입니다')
        .isLength({ min: 6 })
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 
    res.send('user page')
})

module.exports = router;