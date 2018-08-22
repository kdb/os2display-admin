cache-clear:
	vagrant ssh -c "php htdocs/admin/app/console cache:clear --env=dev"

sass:
	vagrant ssh -c "cd htdocs/bundles/kdb/os2display-kkbding2-bundle && gulp sass"

js:
	vagrant ssh -c "cd htdocs/bundles/kdb/os2display-kkbding2-bundle && gulp js"

js-watch:
	vagrant ssh -c "cd htdocs/bundles/kdb/os2display-kkbding2-bundle && gulp js:watch"