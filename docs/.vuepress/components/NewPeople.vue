<template>

    <section class="new-people">

        <div class="section start">
            <h3 class="label">New to the project?</h3>
            <div class="cell-contents">
                <p>Welcome! We recommend you take a look at:</p>

                <ul>
                    <li>The <a target="_blank" href="https://www.amazon.com/Cyberpunk-Malaysia-Various-ebook/dp/B01GPCENNG/ref=sr_1_1">original story</a> (contact <a href="mailto:sandermoolin@gmail.com">Sander</a> if you didn't receive a copy)</li>
                    <li>The <a href="#pitch">pitch</a> for this game</li>
                    <li>The <router-link to="/overview/">main overview</router-link> of gameplay</li>
                    <li>The <a href="#code-of-conduct">Code of Conduct</a></li>
                </ul>

                <p>Then, if you're a(n)...</p>
            </div>
        </div>

        <div class="section">
            <h3 class="label">...Programmer</h3>
            <div class="cell-contents">
                <ul>
                    <li>Read the <a href="#tech-details">tech details</a></li>
                    <li>Head over to the <router-link to="/overview/">main overview</router-link></li>
                </ul>

            </div>
        </div>

        <div class="section">
            <h3 class="label">...Artist</h3>
            <div class="cell-contents">
                <ul>
                    <li>Head over to the <router-link to="/art/">art overview</router-link></li>
                </ul>

            </div>
        </div>

        <div class="section">
            <h3 class="label">...Writer</h3>
            <div class="cell-contents">
                <ul>
                    <li>Head over to the <router-link to="/writing/">writing overview</router-link></li>
                </ul>

            </div>
        </div>

    </section>

</template>

<script>
export default {}
</script>

<style lang="scss">
$main: #3eaf7c;
$white: white;

.new-people {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;

    .section {
        border: 2px solid $main;
        border-radius: 10px;
        overflow: hidden;

        &:first-of-type {
            grid-column: 1 / span 2;
        }
    }
    .label {
        background: $main;
        text-align: center;
        padding: 10px 0;
        color: $white;
        margin: 0;
    }
    .cell-contents {
        margin: 20px 10px;

        & > * {
            margin-right: auto;
            margin-left: auto;
            max-width: 300px;
        }
    }
}
</style>
