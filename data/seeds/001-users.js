exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          id: 1,
          username: 'joeSchmoe',
          password:
            '$2a$10$xVioftSWBCVIRncuiW6zNuHYppaJy5DCQEaVG7D8sni8Osp96jjZW',
          name: 'Joe Schmoe',
          email: 'jSchmoe@testingemail.com',
          img:
            'https://thumbs.dreamstime.com/b/user-sign-icon-person-symbol-human-avatar-rich-man-84519083.jpg',
        },
        {
          id: 2,
          username: 'janeDoe',
          password:
            '$2a$10$xVioftSWBCVIRncuiW6zNuHYppaJy5DCQEaVG7D8sni8Osp96jjZW',
          name: 'Jane Doe',
          email: 'jDoe@testingemail.com',
          img:
            'https://cdn.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg',
        },
        {
          id: 3,
          username: 'johnDoe',
          password:
            '$2a$10$xVioftSWBCVIRncuiW6zNuHYppaJy5DCQEaVG7D8sni8Osp96jjZW',
          name: 'John Doe',
          email: 'jDoe2@testingemail.com',
          img:
            'https://media.istockphoto.com/vectors/user-sign-icon-person-symbol-human-avatar-vector-id639085682?k=6&m=639085682&s=612x612&w=0&h=z8N0zm0o750rt3qJaHFgWrdFIeyOSMAbq0uUm25bTm4=',
        },
        {
          id: 4,
          username: 'testUser',
          password:
            '$2a$10$xVioftSWBCVIRncuiW6zNuHYppaJy5DCQEaVG7D8sni8Osp96jjZW',
          name: 'Test User',
          email: 'testUser2@testingemail.com',
          img:
            'https://thumb1.shutterstock.com/display_pic_with_logo/875032/571608988/stock-vector-electric-robot-avatar-character-vector-illustration-design-571608988.jpg',
        },
      ]);
    });
};
