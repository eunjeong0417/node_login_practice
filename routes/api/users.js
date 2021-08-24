const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//schema가져오기
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');



//register user
//post request
router.post('/', 
    check('name', '이름을 입력하세요')
        .not()
        .isEmpty(),      
    check('email', '이메일을 확인하세요')
        .isEmail(),
    check('password', '비밀번호는 최소 6자리 이상입니다')
        .isLength({ min: 6 }),
 async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 
    
     const { name, email, password } = req.body;
     
     try {
         let user = await User.findOne({ email });

         if (user) {
            return res.status(400).json({ errors: [{ msg: '다른 사용자가 사용하는 이메일 입니다' }] });
         }

         const avatar = gravatar.url(email, {
             s: '200',
             r: 'pg',
             d: 'mm'
         });


         user = new User({
             name,
             email,
             avatar,
             password
         });

         const salt = await bcrypt.genSalt(10);

         user.password = await bcrypt.hash(password, salt);

         await user.save();
         
         const payload = {
             user: {
                 id: user.id
             }
         }

         jwt.sign(payload, config.get('jwt'), { expiresIn: 360000 },
             (err, token) => {
                 if (err) throw err;
                 res.json({ token });
         });
        
     } catch(err) {
         console.error(err.message);
         res.status(500).send('Server error');
    }
})

module.exports = router;