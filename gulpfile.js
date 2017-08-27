const gulp = require('gulp');
const bs = require('browser-sync');

gulp.task('dev', () => {
  bs.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('*.html').on('change', bs.reload);
  gulp.watch('*.js').on('change', bs.reload);
});
