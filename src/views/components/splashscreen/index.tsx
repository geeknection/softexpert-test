import {
    setValueInterface,
    storeInterface,
    systemDataInterface
} from '#/reducers/interfaces';
import { connect } from 'react-redux';
import { ReactChild, useState } from 'react';
import './sass/splash.style.scss';
import Lottie from 'react-lottie';
import Pickachu from './json/lottie-pickachu.json';
import getMessage from '#/translate';
import setValue from '#/reducers/set-value';

interface splashProps {
    systemData: systemDataInterface,
    children?: ReactChild,
    setValue(data: setValueInterface): any,
}

function SplashScreen(props: splashProps) {
    const { loading, isPlaying } = props.systemData;
    const [play, setPlay] = useState(isPlaying);

    const playAudio = () => {
        let data: HTMLAudioElement|null = document.querySelector('#bg-audio');
        if (data) {
            data.volume = 0.3;
            let prom: Promise<void> = data.play();
            prom.then(() => setPlay(true));
            props.setValue({
                reducer: 'systemData',
                type: 'isPlaying',
                value: true
            });
        }
    }

    return(
        <>
        {!play &&
        <div className='splashscreen'>
            <div className='box-loading'>
                <h1 className='splash-title'>{getMessage('systemTitle')}</h1>
                <Lottie options={{
                    loop: true,
                    autoplay: true, 
                    animationData: Pickachu,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }}
                height={400}
                width={400}
                isStopped={false}
                isPaused={false}/>
                {loading && <h2 className='splash-label'>{getMessage('loading')}</h2>}
                {!loading && <button className='btn btn-default btn-letsgo' onClick={playAudio}>{getMessage('lets_go')}</button>}
            </div>
        </div>}
        {play && props.children}
        </>
    );
}

const mapStateToProps = (store: storeInterface) => ({
    systemData: store.systemData
});
const mapDispatchToProps = {
    setValue
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);