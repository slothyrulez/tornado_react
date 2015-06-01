from invoke import Collection, ctask as task

@task
def clean(ctx):
    ctx.run("compass clean")
    ctx.run("rm -Rf compass/.sass-cache")

@task
def scss(ctx):
    ctx.run("compass compile --debug-info --time --trace -c assets/compass/config.rb assets/compass/")

@task
def prun(ctx):
    ctx.run("python toreact.py")

@task(pre=[scss, prun])
def rall(ctx):
    pass

dj = Collection("dj", clean, scss, prun, rall)
dj.configure({"run":{"echo": True, "pty": True}})
dj.name = "dj"
